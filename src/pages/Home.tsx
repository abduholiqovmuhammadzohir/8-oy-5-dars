import { useEffect, useState } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import "../App.css";

interface PhoneType {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  category_id: string;
  createdAt: string;
  updateAt: string;
}

interface BeingDeletedType {
  id: string;
  beingDeleted: boolean;
}

interface PhoneTypeCreate {
  name: string | undefined;
  price: number | undefined | string;
  description: string | undefined;
  status: string;
  category_id: string;
}

function Home() {
  const [data, setData] = useState<PhoneType[]>([]);
  const [beingDeleted, setBeingDeleted] = useState<BeingDeletedType>({ id: "n", beingDeleted: false });
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getData(url: string) {
    const resp = await fetch(url);
    const d = await resp.json();
    setData(d);
    setLoading(false);
  }

  useEffect(() => {
    getData("https://auth-rg69.onrender.com/api/products/all");
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function deleteItem(id: string) {
    if (id) {
      setBeingDeleted({ id: id, beingDeleted: true });
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((d) => {
          if (d.message === "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = JSON.parse(JSON.stringify(data));
            copied = copied.filter((el: PhoneType) => {
              return el.id !== id;
            });
            setData(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setBeingDeleted({ id: id, beingDeleted: false });
        });
    }
  }

  function handleSave(phone: PhoneTypeCreate) {
    setCreateLoading(true);

    fetch("https://auth-rg69.onrender.com/api/products/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.id) {
          let copied = JSON.parse(JSON.stringify(data));
          copied.push(d);
          setData(copied);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCreateLoading(false);
      });
  }

  return (
    <div className="container">
      <Form loading={createLoading} save={handleSave}></Form>

      <div className="card-wrapper">
        {loading ? (
          <div className="loader">Loading...</div> 
        ) : (
          data.length > 0 && data.map((phone, index) => (
            <Card key={index} beingDeleted={beingDeleted} deleteItem={deleteItem} data={phone}></Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
