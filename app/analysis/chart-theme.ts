import { SciChartJSDarkv2Theme } from 'scichart';

export class ChartTheme extends SciChartJSDarkv2Theme {
	constructor() {
		super();
		this.sciChartBackground = 'transparent';
		this.loadingAnimationBackground = 'transparent';
		this.axisBandsFill = '#20212333';
		this.majorGridLineBrush = '#AAAAAA37';
		this.minorGridLineBrush = '#77777719';
		this.strokePalette = ['#F48420', '#AE408E', '#209FD9', '#264B93'];
		this.fillPalette = ['#F4842077', '#AE408E77', '#209FD977', '#264B9377'];
		this.isLightBackground = false;
		this.loadingAnimationForeground = 'transparent';
	}
}
