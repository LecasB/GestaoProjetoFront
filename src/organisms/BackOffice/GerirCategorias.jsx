import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTrash } from "react-icons/fa";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

const GerirItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://xuoapi.azurewebsites.net/api/v1/items"
        );
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData?.images?.[0]}
        alt="Item"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    );
  };

  return (
    <>
      <style>{`.p-datatable-wrapper{
    overflow: auto;
    max-height: 83vh;
    }`}</style>

      <div className="card" style={{ height: "80vh" }}>
        <DataTable
          value={products}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ width: "89vw" }}
        >
          <Column field="title" header="Title" style={{ width: "30%" }} />
          <Column field="price" header="Price" style={{ width: "10%" }} />
          <Column
            header="Image"
            body={imageBodyTemplate}
            style={{ width: "15%" }}
          />
          <Column
            field="description"
            header="Description"
            style={{
              width: "20%",
              height: "100px",
              overflowY: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <Column field="idseller" header="User" style={{ width: "20%" }} />
          <Column header="Delete" body={<FaTrash />} style={{ width: "20%" }} />
        </DataTable>
      </div>
    </>
  );
};

export default GerirItems;
