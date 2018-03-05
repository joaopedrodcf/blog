import React from "react";
import ReactDOM from "react-dom";

class SelectDinamic extends React.Component {
  render() {
    return (
      <div>
        <select
          name="type"
          value={this.props.types.value}
          onChange={this.props.handleChangeType}
        >
          {this.props.types.map(type => (
            <option key={type.id} value={type.type}>
              {type.type}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectDinamic;
