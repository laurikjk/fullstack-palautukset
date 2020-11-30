import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    console.log('blogreducer state now:', state)
    console.log('blogreducer action:', action)

    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        case 'LIKE':
            const id = action.data.id
            const liked = state.find(n => n.id === id)
            const changed = {
                ...liked,
                likes: liked.likes + 1
            }
            const updated = state.map(blog => 
                blog.id !== id ? blog : changed
            )
            return updated
        case 'REMOVE':
            const id2 = action.data
            const removed = state.filter(n => n.id !== id2)
            return removed
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

export const likeBlog = (id) => {
    return async dispatch => {
        const before = await blogService.getOne(id)
        const liked = {...before, likes: before.likes + 1}
        await blogService.update(id, liked)
        dispatch({
            type:'LIKE',
            data: liked
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        console.log('ID TO BE REMOVED', id)
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            data: id
        })

    }
}

export default reducer