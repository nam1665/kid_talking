import React from 'react';
import _ from 'lodash';
import HomeworkLayout from './HomeworkLayout';
import Draggable from 'src/components/Draggable';
import Droppable from 'src/components/Droppable';

class SortOrder extends React.Component {
    state = {
        drops: [1, 2, 3],
        drags: [
            {
                name: 'https://via.placeholder.com/580x380',
                id: 0,
                show: true
            },
            {
                name: 'https://via.placeholder.com/580x380',
                id: 1,
                show: true
            },
            {
                name: 'https://via.placeholder.com/580x380',
                id: 2,
                show: true
            }
        ],
        currentItem: null,
        data: []
    };

    UNSAFE_componentWillMount() {
        const { data } = this.props;

        this.setState({
            drags: data.map(item => {
                return { ...item, show: true };
            })
        });
    }

    onDragStart(item) {
        this.setState({
            currentItem: item
        });
    }

    onDragStop() {
        this.setState({
            currentItem: null
        });
    }

    onDrop(group) {
        const { data, currentItem, drags } = this.state;

        const index = _.findIndex(drags, o => {
            if (o && currentItem && o.pos && currentItem.pos && o.pos == currentItem.pos) return true;

            return false;
        });

        if (index > -1 && drags[index]) {
            drags[index].show = false;
        }

        const dataIndex = _.findIndex(data, o => {
            if (o && currentItem && o.pos && currentItem.pos && o.pos == currentItem.pos) return true;

            return false;
        });

        if (dataIndex > -1) {
            if (data[dataIndex]) data[dataIndex] = data[group];
            else delete data[dataIndex];
        } else if (data[group]) {
            const dragIndex = _.findIndex(drags, o => {
                if (o && data[group] && o.pos && data[group].pos && o.pos == data[group].pos) return true;

                return false;
            });

            if (dragIndex > -1) {
                drags[dragIndex].show = true;
            }
        }

        data[group] = currentItem;

        this.setState({
            data,
            drags
        });
    }

    _renderDropBase() {
        const total = this.props.data.length;

        const output = [];

        for (let i = 1; i <= total; i++) {
            output.push(
                <Droppable
                    tag="div"
                    className={total < 4 ? 'col-4' : 'col-3'}
                    key={i}
                    onDrop={() => {
                        this.onDrop(i);
                    }}
                    style={{
                        zIndex: 0
                    }}
                >
                    <div className="number">{i}</div>
                    <div className="box">
                        {this.state.data[i] && (
                            <Draggable
                                tag="div"
                                className="imgWrap"
                                onDragStart={() => {
                                    this.onDragStart(this.state.data[i]);
                                }}
                                onDragStop={this.onDragStop.bind(this)}
                                style={{
                                    zIndex: 1
                                }}
                            >
                                <img
                                    className="img-fluid w-100"
                                    src={this.state.data[i].img}
                                    alt=""
                                    style={{
                                        zIndex: 0
                                    }}
                                    draggable={false}
                                />
                            </Draggable>
                        )}
                    </div>
                </Droppable>
            );
        }

        return output;
    }

    render() {
        const { onNext, q_title, data, ...other } = this.props;

        return (
            <HomeworkLayout
                {...other}
                title={q_title}
                onNext={() => {
                    let { data } = this.state;

                    data = data.filter(o => o);

                    let correct = false;

                    _.forEach(data, (item, index) => {
                        if (Number(item.pos) == index + 1) {
                            correct = true;
                        } else {
                            correct = false;
                            return false;
                        }
                    });

                    if (onNext)
                        onNext({
                            answer: data.map(o => o.pos),
                            correct,
                            fraction: correct ? 1 : 0
                        });
                }}
                showNextButton={this.state.data.filter(o => o).length == data.length}
            >
                <div className="typeThree container">
                    <div className="row dropWrap">{this._renderDropBase()}</div>

                    <div className="row imageWrap mt-4">
                        {this.state.drags.map((item, key) => {
                            if (item.show) {
                                return (
                                    <div className={data.length > 3 ? 'col-3' : 'col-4'}>
                                        <Draggable
                                            tag="div"
                                            key={key}
                                            className="imgWrap"
                                            onDragStart={() => {
                                                this.onDragStart(item);
                                            }}
                                            onDragStop={this.onDragStop.bind(this)}
                                        >
                                            <img
                                                className="img-fluid w-100"
                                                src={item.img}
                                                alt=""
                                                style={{
                                                    zIndex: 0
                                                }}
                                                draggable={false}
                                            />
                                        </Draggable>
                                    </div>
                                );
                            }

                            return (
                                <div className={data.length > 3 ? 'col-3' : 'col-4'} key={key}>
                                    <div
                                        className="imgWrap"
                                        style={{
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </HomeworkLayout>
        );
    }
}

export default SortOrder;
