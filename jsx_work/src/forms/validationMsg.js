import React, { Component } from "react";
import { validatorContext } from "./validators/validatoContext";

export class ValidationMessage extends Component {
  static contextType = validatorContext;

    render() {

        return (
        this.context.getMessagesforField(this.props.field).map(err =>
            <div className="small bg-danger text-white mt-1 p-1"
                    key={err} >
                {err}
            </div>
        )
        )
    }
}




