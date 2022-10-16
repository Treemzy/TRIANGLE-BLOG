import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost} from "../actions/postActions"



const apiSettings = {


        createListing: async (data, dispatch) => {
            let form_data = new FormData();
            if (data.image)
                form_data.append("image", data.image, data.image.name);
            form_data.append("title", data.title);
            form_data.append("description", data.description);
            form_data.append("category", data.category);

        const myNewModel = await axios
                .post(`/api/posts/create/`, form_data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                       
                    },
                }).then((res) => {
                    return res;
                }).catch((error) => {
                    return error.response;
                });

            if (myNewModel.status === 201) {
                window.location.href = `/api/posts/create/${myNewModel.data.id}`;
            }
            return myNewModel;

        
          
            },
        };

export default apiSettings