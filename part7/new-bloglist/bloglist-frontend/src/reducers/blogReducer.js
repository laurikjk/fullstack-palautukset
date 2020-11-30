import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    console.log('blogreducer state now:', state)
    console.log('blogreducer action:', action)

    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        default:
            return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}