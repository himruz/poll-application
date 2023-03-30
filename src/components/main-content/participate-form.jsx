import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button,
  Label,
} from "reactstrap";

class ParticipationForm extends Component {
  state = {
    name: "",
    selectedOption: "",
    errors: "",
  };

  

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = this.validate();

    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });
      e.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: "",
      });
    } else {
      this.setState({
        errors,
      });
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.name) {
      errors.name = "Please Provide A Name";
    } else if (this.state.name.length > 20) {
      errors.name = "Name Too Long";
    }

    if (!this.state.selectedOption) {
      errors.selectedOption = "Please select atleast one option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            color="warning"
            className="ms-auto"
            type="button"
            onClick={this.props.toggleModal}
          >
            Edit
          </Button>
          <Button
            className="ms-2"
            type="button"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>

        {this.props.poll.options.map((opt) => (
          
          <FormGroup className="my-2" key={opt.id}>
            
            <Label className="d-flex">
              <Input
                type="radio"
                id={opt.id}
                name="selectedOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.errors.selectedOption ? true : false}
              />
              {opt.value}
              <span
                style={{
                  padding: "5px 20px",
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="ms-auto"
              >
                {opt.vote}
              </span>
              <span
                style={{
                  padding: "5px 20px",
                  background: "orange",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="ms-2"
              >
                {this.props.poll.totalVote > 0
                  ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                  : 0}
                %
              </span>
            </Label>
          </FormGroup>
        ))}
        <FormGroup>
          <Input
            name="name"
            placeholder="Enter Name"
            value={this.state.name}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit">Submit Your Opinion</Button>
      </Form>
    );
  }
}

export default ParticipationForm;
