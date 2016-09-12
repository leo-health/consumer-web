import React, {Component} from 'react';
import LoadingSpinner from './LoadingSpinner';

export class ItemSelectionList extends Component {

  componentDidMount() {
    this.props.dispatch(this.props.fetchAction());
  }

  selectObject(object) {
    this.props.dispatch(this.props.selectAction(object));
  }

  onClickObject(object) {
    this.selectObject(object);
    this.props.onClickObject(object);
  }

  renderIfSelected(object) {
    if (object.get("id") === this.props.selectedObjectID) {
      return <h1>{"Selected"}</h1>;
    }
    return null;
  }

  render() {

    const {isLoading, objectList} = this.props;

    if (isLoading || !objectList) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {objectList.map(object=>{
          return (
            <button key={object.get("id")} onClick={()=>
                this.onClickObject(object)
              }>
              {this.renderIfSelected(object)}
              {this.props.renderRow(object)}
            </button>
          );
        })}
      </div>
    );
  }
}
