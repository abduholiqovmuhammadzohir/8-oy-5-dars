import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

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

    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
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
        <div className="card" onClick={handleRedirect}>
            <img width={200} src="https://i5.walmartimages.com/seo/Pre-Owned-Apple-iPhone-X-256GB-Factory-Unlocked-Smartphone-Refurbished-Good_9b5ec8b2-9665-463b-adc5-64829ba72da6.1b496e5a8fcee76fdad69bae12b54745.jpeg" alt="" />
            <h3>Name: <span>{props.data.name}</span></h3>
            <h3>Price: <span>{props.data.price}</span></h3>
            <h3>Status: <span>{props.data.status}</span></h3>
            <h3>Description: <span>{props.data.description}</span></h3>

            {
                 !(props.beingDeleted?.beingDeleted && props.beingDeleted?.id == props.data?.id) ? <button onClick={handleDelete}>Delete</button> : "O'chirilmoqda..."
            }
        </div>
    )
}

export default Card
