import { FaEdit, FaTrash } from "react-icons/fa"

const List = ({ items, removeItem, editItem }) => {
    return (
        <div className="grocery-list">
            {
                items.map(item => {
                    return (
                        <article className="grocery-item" key={item.id}>
                            <p className="title">{item.title}</p>
                            <div className="btn-container">
                                <button className="edit-btn" type="button" onClick={() => editItem(item.id)}>
                                    <FaEdit />
                                </button>
                                <button className="delete-btn" type="button" onClick={() => removeItem(item.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default List