import React from "react";
import { Input } from "reactstrap";

export default class SelectTypes extends React.Component {
  render() {
    const { types } = this.props;
    const handleChangeType = this.props.handleChangeType;

    return (
      <Input type="select" name="type" onChange={handleChangeType}>
        {types.map(type => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </Input>
    );
  }
}
