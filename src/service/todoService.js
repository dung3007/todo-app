import axios from "axios";

const API_URL = "https://67b731112bddacfb270e097f.mockapi.io/api/todo/todo";

// Lấy danh sách công việc với phân trang
export const getTodos = async (params) => {
    const { page, limit, search } = params;
    console.log(page)
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}&search=${search || ''}`);
        return response.status == 200 ? response.data : []
    } catch (error) {
        return []
    }
};

// Thêm công việc mới
export const addTodo = async (todo) => {
    const response = await axios.post(API_URL, {
        ...todo,
    });
    return response.data;
};

// Cập nhật trạng thái công việc
export const updateTodoStatus = async (id, todoUpdated) => {
    const response = await axios.put(`${API_URL}/${id}`, { ...todoUpdated });
    return response.data;
};

// Xóa công việc
export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};