// @ts-nocheck
import ResizeDetector from 'react-resize-detector';
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import style from './index.less';
import { debounce } from '@/utils/common';
export default class MyComponent extends React.Component {
  constructor(props) {
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
  }

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
    this.scene.remove(this.cube);
    this.cube.geometry.dispose();
    this.cube.material.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    console.log('成功销毁');
  }

  initThree = () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.state.width / this.state.height,
      0.1,
      1000,
    );
    //设置相机位置
    this.camera.position.set(2, 2, 10);
    this.scene.add(this.camera);
    //创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    //设置材质
    const cubeMemarial = new THREE.LineBasicMaterial({
      color: 0xbdecaa,
    });
    //根据几何体和材质创建物体
    this.cube = new THREE.Mesh(cubeGeometry, cubeMemarial);
    //将几何体添加到场景当中
    this.scene.add(this.cube);
    //初始化渲染器
    //设置渲染的尺寸大小
    this.renderer.setSize(this.state.width, this.state.height);
    //设置背景颜色
    this.renderer.setClearColor(0xffffff);
    //将webgl渲染的convas内容添加到body
    this.elementRef.current.appendChild(this.renderer.domElement);
    //使用渲染器，通过相机将场景渲染进来
    this.renderer.render(this.scene, this.camera);
    //绘制网格场景

    //网格线绘制
    const grid = new THREE.GridHelper(20, 20);
    grid.position.y = -0.5;
    grid.position.x = -0.5;
    grid.position.z = -0.5;
    this.scene.add(grid);
    this.setVisualAngle();
  };

  setVisualAngle = () => {
    //设置控制器可以移动视角

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    this.animate();
  };

  handleResize = (width, height) => {
    this.setState({ width, height });

    console.log(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
  debounceHandleResize = debounce(this.handleResize, 100);

  render() {
    return (
      <React.Suspense>
        <ResizeDetector
          handleWidth
          handleHeight
          onResize={this.debounceHandleResize}
        >
          <div ref={this.elementRef} className={style.container}></div>
        </ResizeDetector>
      </React.Suspense>
    );
  }
}
