import CustomErrorMessage from "../../Forms/CustomErrorMessage";
import { Button } from "../../../App";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { statusData, typeData } from "../Filters/data";
import CustomDropList from "../../Forms/CustomDropList";
import CustomInput from "../../Forms/CastomInput";

export default function CustomForm({ initialValue, editData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });

  return (
    <>
      <form className="form">
        <ul>
          <li className={"form__item"}>
            <CustomDropList
              name={"Status"}
              arr={statusData}
              register={register}
            />
          </li>
          <li className={"form__item"}>
            <CustomDropList name={"Type"} arr={typeData} register={register} />
          </li>
          <li className={"form__item"}>
            <CustomInput
              register={register}
              name={"Client name"}
              formName={"ClientName"}
            />
          </li>
          <li className={"form__item"}>
            <CustomInput
              register={register}
              name={"Amount"}
              formName={"Amount"}
              err={{ required: true, minLength: 4 }}
            />
            <CustomErrorMessage
              condition={errors.Amount && errors.Amount.type === "minLength"}
              errorText={"Min length is 4 characters"}
            />
            <CustomErrorMessage
              condition={errors.Amount && errors.Amount.type === "required"}
              errorText={"Amount is required"}
            />
          </li>
        </ul>
        <Button onClick={handleSubmit((data) => editData(data))}>Save</Button>
      </form>
    </>
  );
}

CustomForm.propTypes = {
  initialValue: PropTypes.object,
  editData: PropTypes.func,
};
