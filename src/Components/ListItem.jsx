import Swal from "sweetalert2";
import {v4 as uuidv4} from 'uuid';

const ListItem = ({
      item,
      listItems,
      setListItems,
      handleCheckboxChange
}) => {

    const {id, name, quantity, unit, checked} = item;

    const deleteListItem = () =>{
      const newList = listItems.filter((item) => item.id !== id);
      localStorage.setItem("listItems", JSON.stringify(newList));
      setListItems(newList);
    };

    const newList=[
      ...listItems,
      {
        ...item,
        id:uuidv4()        }
    ]

    const cloneListItem = () =>{
      localStorage.setItem("listItems",JSON.stringify(newList));
      setListItems(newList);
    }

    const editListItem = async () =>{
      const {value} = await Swal.fire({
        title:"Item Information",
        html:`<input 
              type="text" 
              id="Pregunta" 
              name="Pregunta" 
              class="swal2-input" 
              placeholder="Item"
              value="${Pregunta}"
              />
              <input 
              type="number" 
              id="Respuesta" 
              name="Respuesta" 
              class="swal2-input" 
              placeholder="Qty"
              value="${Respuesta}"
              />
              <input 
              type="text" 
              id="Respuesta2" 
              name="Respuesta2" 
              class="swal2-input" 
              placeholder="Unit"
              value="${Respuesta2}"
              />
              <input 
              type="number" 
              id="Respuesta3" 
              name="Respuesta3" 
              class="swal2-input" 
              placeholder="Qty"
              value="${Respuesta3}"
              />`,
              confirmButtonText:"Add Question",
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              cancelButtonText: "Dismiss",
              preConfirm: () =>{
               const Pregunta=Swal.getPopup().querySelector('#Pregunta').value;
               const Respuesta=Swal.getPopup().querySelector('#Respuesta').value;
               const Respuesta2=Swal.getPopup().querySelector('#Respuesta2').value;
               const Respuesta3=Swal.getPopup().querySelector('#Respuesta3').value;
  
          if (!Pregunta|| !Respuesta|| !Respuesta2 ||!Respuesta3) {
            Swal.showValidationMessage('Please enter the item full information');
          }
          return{Pregunta, Respuesta, Respuesta2, Respuesta3}
        },
      })
  
      if(!value.Pregunta || !value.Respuesta || !value.Respuesta2 ||!value.Respuesta3) return
  
      const newList = listItems.map((item) => {
        if (item.id === id) {
          item.Pregunta = value.Pregunta;
          item.Respuesta = value.Respuesta;
          item.Respuesta2 = value.Respuesta2;
          item.Respuesta3 = value.Respuesta3;
        }
        return item;
      })
      localStorage.setItem("listItems",JSON.stringify(newList))
      setListItems(newList);
    }

    return(
        <div className="row">
          <div className="col-1">
            <input 
            name={Pregunta}
            type="checkbox"
            onChange={(e)=>handleCheckboxChange(e)}
            checked={checked}
            />
          </div>
          <div className="col text-start">
            {checked ? 
            <s>{`${quantity} ${unit}`}</s> :
             `${quantity} ${unit}`}
          </div>
          <div className="col-5 col-md-7 text-start" 
            style={{textDecoration: checked && "line-through"}}>
              {
                `${name}`
              }
          </div>
          <div className="col-4 col-md-3 btn-group btn-group-sm text-end" role="group">
          <button 
            className="btn btn-outline-primary"
            onClick={editListItem}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={cloneListItem}
              >
              <i className="bi bi-files"></i>
            </button>  
            <button 
              className="btn btn-outline-danger"
              onClick={deleteListItem}
              >
              <i className="bi bi-trash2-fill"></i>
            </button>   
          </div>
        </div>
    );
}

export default ListItem