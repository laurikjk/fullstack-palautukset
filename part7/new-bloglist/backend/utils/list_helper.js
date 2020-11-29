const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
    let fav = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes >= fav.likes) fav=blog
    })
    return fav
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
        ? null
        : mostLikes(blogs)
}
  
module.exports = {
   dummy, totalLikes, favoriteBlog
}

