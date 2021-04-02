import { useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import styles from "../styles/pages/RegisterStudent.module.css";
import api from "../services/api";
import { Form } from "@unform/web";
import SuccessfulRegister from "../components/SuccessfulRegister";
import Spinner from "../components/Spinner";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import childrens from "../styles/images/undraw_children_4rtb 1.svg";
import ImageInput from "../components/ImageInput";
import { FiChevronLeft } from "react-icons/fi";

function RegisterStudent(props) {
  const formRef = useRef(null);
  const [schools, setSchools] = useState([]);
  const [kits, setKits] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("parent_id")) {
      navigate("/parent");
    }
  }, []);

  async function loadOptions() {
    const schoolResponse = await api.get("/schools");
    const kitResponse = await api.get("/kits");

    const schoolOptions = schoolResponse.data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

    const kitOptions = kitResponse.data.map((item) => {
      return {
        value: item.id,
        label: item.title,
      };
    });

    setSchools(schoolOptions);
    setKits(kitOptions);
  }

  useEffect(() => {
    loadOptions();
  }, []);

  const handleSubmit = async (data, { reset }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("school_id", data.school_id);
    formData.append("kit_id", data.kit_id);
    formData.append("enrollment", data.enrollment);
    formData.append("description", description);

    const parent_id = localStorage.getItem("parent_id");

    const response = await api.post(`/students/${parent_id}`, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });

    setIsLoading(false);
    reset();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        {props.location.state?.registered && (
          <FiChevronLeft onClick={() => navigate(-1)} size={40} />
        )}
        <img src={childrens} alt="Crianças brincando" />
        <div className={styles.formContainer}>
          <h3>Cadastre seu filho</h3>
          <div className={styles.form}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ImageInput name="avatar" />
              <Input name="name" placeholder="Nome completo da criança" />
              <Select
                name="kit_id"
                options={kits}
                className={styles.select}
                placeholder="Escolha o kit desejado"
              />
              <Select
                name="school_id"
                options={schools}
                className={styles.select}
                placeholder="Nome da escola"
              />
              <Input name="enrollment" placeholder="Número da matrícula" />
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Fale um pouco sobre seu filho"
              ></textarea>
              <Button type="submit">
                {isLoading ? <Spinner size={30} /> : "Cadastrar"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
      { isModalOpen && <SuccessfulRegister setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default RegisterStudent;
