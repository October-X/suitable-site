import React, {PureComponent} from "react";
import * as eCharts from "echarts";
import RcReactObserver from 'rc-resize-observer'

export default class App extends PureComponent<any, any> {
    private myChart;
    private chartRef: HTMLElement;

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {option} = this.props
        this.myChart = eCharts.init(this.chartRef);
        this.myChart.setOption(option);
    }
    componentDidUpdate(){
        const {option} = this.props
        this.myChart.setOption(option);
    }
    resize = () => {
        this.myChart.resize()
    }

    render() {
        // const {option} = this.props
        return (
            <RcReactObserver onResize={this.resize}>
                <div ref={(ref) => (this.chartRef = ref)} style={{
                    width: '100%',
                    height: '100%',
                }}
                />
            </RcReactObserver>
        )
    }
}
