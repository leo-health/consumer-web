import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import CSSModules from 'react-css-modules';
import styles from './item-selection-list.css';

export class _ItemSelectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }

  componentDidMount() {
    if (this.props.fetchAction) {
      this.props.dispatch(this.props.fetchAction());
    }
  }

  onClickObject(object) {
    const {selectAction, dispatch} = this.props;
    if (selectAction) {
      dispatch(selectAction(object));
    }
    if (this.props.onClickObject) {
      this.props.onClickObject(object);
    }
  }

  getOptionClass(object) {
    if (object.get("id") === this.props.selectedObjectID) {
      return "selected";
    }
    return "option";
  }

  render() {
    const {isLoading, objectList} = this.props;

    if (isLoading || !objectList) { return <LoadingSpinner/>; }

    return (
      <div>
        {objectList.map(object=>{
          return (
            <div key={object.get("id")} onClick={()=>
                this.onClickObject(object)
              }>
              <div styleName={this.getOptionClass(object)}>
                {this.props.renderRow(object)}
                <div styleName='line'></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export const ItemSelectionList = CSSModules(_ItemSelectionList, styles);
