// @ts-nocheck
import * as React from 'react';
import * as THREE from 'three';
import style from './index.less';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ResizeDetector from 'react-resize-detector';
import { debounce } from '@/utils/common';
import {
  setVisualAngle,
  drawFrontArrow,
  modifyCubeSize,
  destoryThreeComponent,
} from '@/utils/threeCommom';

class MyComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      width: 0,
      height: 0,
    };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.cube = null;
    this.edge = null;
    this.arrowHelper = null;
  }

  handleResize = (width, height) => {
    this.setState({ width, height });
    console.log(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
  debounceHandleResize = debounce(this.handleResize, 100);

  handleClick = () => {
    //改变尺寸
    this.cube.remove(this.edges);
    this.edges = modifyCubeSize(this.cube, 0xbeaa, 1, {
      depth: 1,
      width: 1,
      height: 1,
    });
    this.renderer.render(this.scene, this.camera);

    this.handleSetColor(0x123345, 0x1245);

    //将箭头重新绘制箭头
    this.cube.remove(this.arrowHelper);
    this.arrowHelper = drawFrontArrow({ x: 0, y: 0, z: 2 }, 1);
    this.cube.add(this.arrowHelper);
  };

  handleSetAnimation = () => {
    cancelAnimationFrame(this.animationFrameId);
    this.cube.rotation.x = 0;
    this.cube.rotation.y = 0;
  };

  handleSetColor = (color, edgeColor) => {
    this.cube.material.color.set(color);
    this.edges.material.color.set(edgeColor);

    this.handleSetAnimation();
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleResize(
        this.elementRef.offsetWidth,
        this.elementRef.offsetHeight,
      );
      this.initThree();
    }, 300);
  }

  componentWillUnmount(): void {
    destoryThreeComponent(this.scene, this.cube, this.renderer);
  }

  /**
   * @Description: 初始化
   * @return {*}
   */
  initThree = () => {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.state.width / this.state.height,
      1,
      1000,
    );
    this.renderer.setSize(this.state.width, this.state.height);
    this.elementRef.current.appendChild(this.renderer.domElement);
    this.geometry = new THREE.BoxGeometry(20, 10, 20);

    const material = new THREE.MeshBasicMaterial({
      color: 0xbdecaa,
      transparent: true,
      opacity: 0.5,
    });
    material.depthWrite = false;
    this.cube = new THREE.Mesh(this.geometry, material);

    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0xbdaa,
      transparent: true,
    });
    const edgesGeometry = new THREE.EdgesGeometry(this.geometry, 1);
    this.edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    this.scene.add(this.cube);
    this.cube.add(this.edges);

    this.camera.position.z = 40;
    this.renderer.setClearColor(0xffffff);
    this.renderer.render(this.scene, this.camera);
    setVisualAngle(this.scene, this.camera, this.renderer);

    this.arrowHelper = drawFrontArrow({ x: 0, y: 0, z: 2.5 }, 1);
    this.cube.add(this.arrowHelper);

    // this.rotate()

    //绘制虚线
    const material1 = new THREE.LineDashedMaterial({
      color: 0x000000,
      linewidth: 0.1,
      scale: 0.1,
      dashSize: 0.1,
      gapSize: 0.1,
    });

    const points = [];
    points.push(new THREE.Vector3(20, 0, 0));
    points.push(new THREE.Vector3(0, 20, 0));
    // points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material1);
    line.computeLineDistances();
    this.cube.add(line);

    // //创建文字
    // let textGeometry1 = new THREE.TextGeometry('Start', {
    //   font: new THREE.Font(''),
    //   size: 0.5,
    //   height: 0.1,
    //   curveSegments: 12,
    // });
    //
    // // 创建第二个文字几何体
    // let textGeometry2 = new THREE.TextGeometry('End', {
    //   font: new THREE.Font(''),
    //   size: 0.5,
    //   height: 0.1,
    //   curveSegments: 12,
    // });
    //
    // // 创建第一个文字网格
    // let textMesh1 = new THREE.Mesh(
    //   textGeometry1,
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    // );
    // textMesh1.position.set(-10, 0.5, 0);
    // this.scene.add(textMesh1);
    //
    // // 创建第二个文字网格
    // let textMesh2 = new THREE.Mesh(
    //   textGeometry2,
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    // );
    // textMesh2.position.set(10, 0.5, 0);
    // this.scene.add(textMesh2);

    //显示坐标轴
    let axesHelper = new THREE.AxesHelper(20);
    this.cube.add(axesHelper);

    //绘制虚线2
    // let dashedLineMaterial = new THREE.LineDashedMaterial({
    //   color: 0x0000ff,
    //   linewidth: 2,
    //   dashSize: 3,
    //   gapSize: 1,
    // });

    // let lineGeometry = new THREE.BufferGeometry();
    // lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    // lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
    // lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));

    // let dashedLine = new THREE.Line(lineGeometry, dashedLineMaterial);
    // this.scene.add(dashedLine);
  };

  /**
   * @Description: 旋转动画
   * @return {*}
   */
  rotate = () => {
    this.animationFrameId = requestAnimationFrame(this.rotate);
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <>
        <div
          className="div"
          onClick={this.handleClick}
          style={{ position: 'fixd' }}
        >
          设置尺寸
        </div>
        <ResizeDetector
          handleWidth
          handleHeight
          onResize={this.debounceHandleResize}
        >
          <div ref={this.elementRef} className={style.container}></div>
        </ResizeDetector>
      </>
    );
  }
}

export default MyComponent;
