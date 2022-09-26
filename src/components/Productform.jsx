
import { useState } from "react";

const initState = {
    title: "",
    gender: "",
    price: "",
    category: "",
    image: ""
};

export default function ProductForm() {
    const [formData, setFormData] = useState(initState);

    const handleChange = (e) => {
        const { value, name } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        postData();
    };

    const postData = () => {
        fetch("http://localhost:3001/products", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    };


    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title :
                        <input
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Gender :
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Price :
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Category :
                        <input
                            name="category"
                            type="text"
                            checked={formData.category}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image :
                        <input
                            name="image"
                            type="text"
                            checked={formData.image}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <input type="submit" value="SUBMIT FORM" />
                </div>
            </form>

        </div>
    );
}
