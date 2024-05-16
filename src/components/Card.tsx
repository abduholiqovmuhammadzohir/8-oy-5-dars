import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface CardType {
    data: {
        id: string,
        name: string,
        description: string,
        price: number,
        status: string,
        category_id: string,
        createdAt: string,
        updateAt: string
    },
    deleteItem: (arg: string) => void,
    beingDeleted: {
        id?:string,
        beingDeleted?:boolean
    }
}


const Card: FC<CardType> = (props) => {

    function handleDelete() {
        let isDelete = confirm("Rostan ham o'chirmoqchimisiz")
        if (isDelete) {
            props.deleteItem(props.data.id)
        }
    }

    const navigate = useNavigate()

    function handleRedirect() {
        navigate (`details/${props.data.id}`)
    }

    return (
        <div onClick={handleRedirect}>
            <h3>{props.data.name}</h3>
            <h3>{props.data.price}</h3>
            <h3>{props.data.status}</h3>
            <h3>{props.data.description}</h3>

            {
                 !(props.beingDeleted?.beingDeleted && props.beingDeleted?.id == props.data?.id) ? <button onClick={handleDelete}>Delete</button> : "O'chirilmoqda..."
            }

        
        </div>
    )
}

export default Card