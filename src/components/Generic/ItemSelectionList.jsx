import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import CSSModules from 'react-css-modules';
import styles from './item-selection-list.css';

export class _ItemSelectionList extends React.Component {

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
            <div key={object.get("id")} onClick={()=>
                this.onClickObject(object)
              }>
              {this.renderIfSelected(object)}
              <div styleName='option'>
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
