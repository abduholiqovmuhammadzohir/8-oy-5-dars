import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface PhoneType {
    id: string,
    name: string,
    description: string,
    price: number,
    status: string,
    category_id: string,
    createdAt: string,
    updateAt: string
  }

function Details() {

    const [phone, setPhone] = useState<PhoneType>()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            fetch(`https://auth-rg69.onrender.com/api/products/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setPhone(data)
                console.log(data);
                
            })
            .catch(err => {
                console.log(err);
                
            })
        }else {
            navigate('/')
        }

    },[])
 
    return (
    <div>
        <h3>{phone?.name}</h3>
    </div>
  )
}

export default Details