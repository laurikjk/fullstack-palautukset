import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }
  const sortedBlogs = props.blogs.sort(sortByLikes)

  return (
    <Table striped>
      <tbody>
        {sortedBlogs.map(blog =>
        <tr key={blog.id}>
          <td>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  showNotification
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList