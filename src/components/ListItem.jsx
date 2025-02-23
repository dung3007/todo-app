import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTodos } from "../service/todoService";

const ListItem = (props) => {
    const { todos, setTodos, handleDeleteTodo, params, setParams, toggleUpdateTodo } = props;

    const [hasNext, setHasNext] = useState(true)

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newTodos = Array.from(todos);
        const [reorderedItem] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, reorderedItem);
        setTodos(newTodos);
    };

    const fetchData = async () => {
        setParams({
            ...params,
            page: params?.page + 1
        })

        const data = await getTodos({ ...params, page: params?.page + 1 });
        if (data?.length == 0) {
            setHasNext(false)
        }
        setTodos(data?.length ? [...todos, ...data] : [...todos]);
    }


    return (
        <div id="scrollableDiv" style={{ maxHeight: '70vh', overflow: 'auto' }}>
            {todos?.length > 0 ? (
                <InfiniteScroll
                    dataLength={todos.length}
                    next={fetchData}
                    hasMore={hasNext}
                    pullDownToRefreshThreshold={100}
                    height={500}
                    // scrollableTarget='scrollableDiv'
                >
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false} droppableId="taskList" direction="vertical">
                        {(provided) => (
                            <div ref={provided.innerRef}{...provided.droppableProps}>
                                {todos && todos?.map((todo, index) => {
                                    return (
                                        <Draggable key={todo?.id} draggableId={todo?.id} index={index}>
                                            {(dragProvided, dragSnapshot) => (
                                                <div
                                                    ref={dragProvided.innerRef}
                                                    {...dragProvided.draggableProps}
                                                    {...dragProvided.dragHandleProps}
                                                    data-is-dragging={dragSnapshot.isDragging}
                                                    data-testid={String(todo?.id)}
                                                    className="p-3 border rounded-lg mb-2"
                                                >
                                                    <div className="flex items-center text-black justify-between p-3 border rounded-lg">
                                                        <div
                                                            className={`cursor-pointer`}
                                                        // onClick={() => toggleUpdateTodo(todo)}
                                                        >
                                                            <div>{todo?.title}</div>
                                                            <div>{todo?.description}</div>
                                                            <div>
                                                                {todo?.status == 'pending'
                                                                    ? 'Chưa xử lý'
                                                                    : todo?.status == 'completed'
                                                                        ? 'Hoàn thành'
                                                                        : todo?.status == 'in_progress'
                                                                            ? 'Đang xử lý'
                                                                            : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={(e) => { e.stopPropagation(), toggleUpdateTodo(todo) }} className="text-red-500">Sửa</button>
                                                            <button onClick={(e) => { e.stopPropagation(), handleDeleteTodo(todo?.id) }} className="text-red-500">Xóa</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                </InfiniteScroll>
            ) : (
                <div style={{ height: '30vh' }} className="text-black text-center flex justify-center items-center">
                    Thêm mới công việc
                </div>
            )}
        </div>
    )
}

export default ListItem