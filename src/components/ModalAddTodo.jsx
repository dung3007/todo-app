import { Box, Button, InputLabel, Modal, NativeSelect, Select, TextField } from "@mui/material";
import { useState } from "react";

const ModalAddTodo = ({ open, onClose, handleAddTodo, type, itemUpdate, handleUpdateTodo }) => {
    const optionStatus = [
        {
            id: 1,
            value: 1,
            name: 'Chưa hoàn thành',
            keyName: 'pending'
        },
        {
            id: 2,
            value: 2,
            name: 'Đang thực hiện',
            keyName: 'in_progress'
        },
        {
            id: 3,
            value: 3,
            name: 'Hoàn thành',
            keyName: 'completed'
        }
    ]

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 300,
        width: '40vw',
        bgcolor: 'white',
        color: 'black',
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    const [valueSelected, setValueSelected] = useState(
        type == 'UPDATE'
        ? optionStatus?.find(i => i?.keyName == itemUpdate?.status).value
        : optionStatus[0].value
    )
    const [title, setTitle] = useState(type == 'UPDATE' ? itemUpdate?.title : '')
    const [desc, setDesc] = useState(type == 'UPDATE' ? itemUpdate?.description : '')
    const [status, setStatus] = useState(type == 'UPDATE' ? itemUpdate?.status : optionStatus[0].keyName)

    const submit = () => {
        if (!desc || !title) {
            alert('Nhập tiêu đề và mô tả')
            return
        }
        if (type == 'UPDATE') {
            handleUpdateTodo(itemUpdate?.id, {
                status,
                title,
                description: desc
            })
        } else {
            handleAddTodo({
                title,
                description: desc,
                status
            })
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='flex flex-col gap-4'>
                <div className="text-2xl text-center">{type == 'UPDATE' ? 'Cập nhật' : 'Thêm mới'}</div>
                <div>
                    <div className="pb-2">Tiêu đề</div>
                    <TextField className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề" />
                </div>
                <div>
                    <div className="pb-2">Mô tả</div>
                    <TextField className="w-full" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Nhập mô tả" />
                </div>
                <div>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Trạng thái
                    </InputLabel>
                    <NativeSelect
                        defaultValue={valueSelected}
                        inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                        }}
                        className="w-full"
                        onChange={(e) => setStatus(optionStatus?.find(i => i?.value == Number(e.target.value))?.keyName)}
                    >
                        {optionStatus?.map((status, index) => (
                            <option key={index} value={status?.value}>{status?.name}</option>
                        ))}
                    </NativeSelect>
                </div>

                <div className="flex justify-end">
                    <Button onClick={onClose}>Hủy</Button>
                    <Button onClick={submit}>{type == 'UPDATE' ? 'Lưu' : 'Thêm'}</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalAddTodo;