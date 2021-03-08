
import * as React from 'react';

class Fancy2Button extends React.Component {

    render () {
        console.log(this.props)
        return (
            <div>
                <input ref={this.props.inputRef} />
                <button className="fancyButton"  onClick={this.props.onClick}>
                    { this.props.children }
                </button>
            </div>
        )
    }
}

function logProps(WrappedComponent) {

    class LogProps extends React.Component {

      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    // return React.forwardRef((props, ref) => {
    //     return (
    //         <LogProps {...props} inputRef={ref}></LogProps>
    //     )
    // });

    console.log(WrappedComponent.displayName)

    //命名
    return React.forwardRef(
        function MyNameFunction (props, ref) {
            return <LogProps {...props} inputRef={ref}></LogProps>
        }
    );
}

export default logProps(Fancy2Button);
