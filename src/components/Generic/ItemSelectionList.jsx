import React, {Component} from 'react';
import LoadingSpinner from './LoadingSpinner';

export class ItemSelectionList extends Component {

  componentDidMount() {
    this.props.dispatch(this.props.fetchAction());
  }

  selectObject(objectID) {
    this.props.dispatch(this.props.selectAction(objectID));
  }

  onClickObject(objectID) {
    this.selectObject(objectID);
    this.props.onClickObject(objectID);
  }

  renderIfSelected(objectID) {
    if (objectID === this.props.selectedObjectID) {
      return <h1>{"Selected"}</h1>;
    }
    return null;
  }

  render() {

    const {objects, isLoading} = this.props;

    if (isLoading || !objects) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {objects.map(object=>{
          return (<button key={object.get("id")} onClick={()=>
              this.onClickObject(object.get("id"))
            }>
            {this.renderIfSelected(object.get("id"))}
            {this.props.renderRow(object)}
          </button>);
        })}
      </div>
    );
  }
}
