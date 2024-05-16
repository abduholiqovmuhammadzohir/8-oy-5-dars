import { FC, useRef } from "react"

interface FormType {
    save: (arg: PhoneType) => void,
    loading: boolean
}

interface PhoneType {
    name: string | undefined,
    price: number | undefined | string,
    description: string | undefined,
    status: string,
    category_id: string
}

const Form: FC<FormType> = (props) => {

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    function handleSave(event: React.MouseEvent) {
        event.preventDefault();
        const phone: PhoneType = {
            name: nameRef.current?.value,
            price: priceRef.current?.value,
            description: descriptionRef.current?.value,
            status: 'default status',
            category_id: 'default category' 
        }

        props.save(phone);
        if (nameRef?.current?.value) {
            nameRef.current.value = ''
        }

        if (priceRef?.current?.value) {
            priceRef.current.value = ''
        }

        if (descriptionRef?.current?.value) {
            descriptionRef.current.value = ''
        }

    }

    return (
        <div>
            <form>
                <input ref={nameRef} type="text" placeholder="Enter name..." />
                <input ref={priceRef} type="number" placeholder="Enter price..." />
                <textarea ref={descriptionRef} name="" placeholder="Enter description..."></textarea>
                <button onClick={handleSave} disabled={props.loading ? true : false}>  {props.loading ? "Yuborilmoqda..." : "Saqlash"}</button>
            </form>
        </div>
    )
}

export default Form