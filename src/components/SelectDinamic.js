import React from "react";

class SelectDinamic extends React.Component {
  render() {
    const types = this.props.types;
    const handleChangeType = this.props.handleChangeType;

    return (
      <select name="type" onChange={handleChangeType}>
        {types.map(type => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectDinamic;
