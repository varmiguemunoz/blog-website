import { Link } from "react-router-dom"

const ArticleButton = ({id}) => {
    return (
    <Link to={`articles/${id}`}>View more..</Link>
    )
}

export default ArticleButton;