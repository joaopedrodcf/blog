import React from "react";
import { Input } from "reactstrap";

export default class SelectDinamic extends React.Component {
  render() {
    const types = this.props.types;
    const handleChangeType = this.props.handleChangeType;

    return (
      <Input type="select" name="type" onChange={handleChangeType}>
        {types.map(type => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </Input>
    );
  }
}
