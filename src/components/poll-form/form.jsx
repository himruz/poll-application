import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleChange,
  hanldeOptionChange,
  createOptions,
  deleteOption,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="A dummy title"
          value={title}
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="title">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Describe your poll"
          value={description}
          onChange={handleChange}
          invalid={errors.description ? true : false}
        />
        {errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label>
          Enter Option
          <span
            style={{
              background: "green",
              marginLeft: "30px",
              marginBottom:'5px',
              padding: "5px",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={createOptions}
          >
            Add Option
          </span>
          {options.map((opt, index) => {
            return (
              <div key={opt.id} className="d-flex my-2 w-100">
                <Input
                  value={opt.value}
                  onChange={(e) => hanldeOptionChange(e, index)}
                  invalid={
                    errors.options && errors.options[index] ? true : false
                  }
                />
                <Button
                  color="danger"
                  disabled={options.length <= 2}
                  className="ms-2"
                  onClick={() => deleteOption(index)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </Label>
      </FormGroup>
      <Button color="primary" type="submit">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default MyForm;
