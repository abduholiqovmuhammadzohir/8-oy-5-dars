import { FC, useRef, useState } from "react"

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

    const [nameError, setNameError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);

    function validateForm(): boolean {
        let isValid = true;

        if (!nameRef.current?.value) {
            setNameError("Name kiritish shart");
            isValid = false;
        } else {
            setNameError(null);
        }

        if (!priceRef.current?.value || Number(priceRef.current?.value) <= 100) {
            setPriceError("Price kiritish shart");
            isValid = false;
        } else {
            setPriceError(null);
        }

        if (!descriptionRef.current?.value || descriptionRef.current?.value.length < 10) {
            setDescriptionError("Description kamida 10 ta belgi bo'lishi kerak");
            isValid = false;
        } else {
            setDescriptionError(null);
        }

        return isValid;
    }

    function handleSave(event: React.MouseEvent) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const phone: PhoneType = {
            name: nameRef.current?.value,
            price: priceRef.current?.value,
            description: descriptionRef.current?.value,
            status: 'default status',
            category_id: 'default category' 
        }

        props.save(phone);

        if (nameRef.current?.value) {
            nameRef.current.value = ''
        }

        if (priceRef.current?.value) {
            priceRef.current.value = ''
        }

        if (descriptionRef.current?.value) {
            descriptionRef.current.value = ''
        }
    }

    return (
        <div className="form">
            <form>
                <label>Enter name*</label><br />
                <input ref={nameRef} type="text" placeholder="Enter name..." /><br />
                {nameError && <span style={{ color: 'red' }}>{nameError}</span>}<br />
                <label>Enter price*</label><br />
                <input ref={priceRef} type="number" placeholder="Enter price..." /><br />
                {priceError && <span style={{ color: 'red' }}>{priceError}</span>}<br />
                <label>Enter description*</label><br />
                <textarea ref={descriptionRef} name="" placeholder="Enter description..."></textarea><br />
                {descriptionError && <span style={{ color: 'red' }}>{descriptionError}</span>}<br />
                <button onClick={handleSave} disabled={props.loading}>{props.loading ? "Yuborilmoqda..." : "Saqlash"}</button>
            </form>
        </div>
    )
}

export default Form
