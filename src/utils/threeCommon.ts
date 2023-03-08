import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { curry } from '@/utils/common';


/**
 * 设置控制器可以移动视角
 * @param scene
 * @param controls
 * @param renderer
 */

//@ts-ignore
export const setVisualAngle = (scene, camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
};

/**
 * 绘制箭头
 * @param color
 * @param originCoordinate
 * @param targetCoordinate
 * @param length
 * @returns
 */
//@ts-ignore
export const drawArrow = (color,originCoordinate, targetCoordinate, length) => {
  const dir = new THREE.Vector3(
    originCoordinate.x,
    originCoordinate.y,
    originCoordinate.z,
  );
  dir.normalize();
  const origin = new THREE.Vector3(
    targetCoordinate.x,
    targetCoordinate.y,
    targetCoordinate.z,
  );
  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color);
  return arrowHelper;
};

export const drawFrontArrow = curry(drawArrow,0x000000,{x:0,y:0,z:-1});


/**
 * 销毁three模块
 * @param scene
 * @param cube
 * @param renderer
 */
// @ts-ignore
export const distoryThreeComponent = (scene,cube,renderer)=>{
  scene.remove(cube);
  cube.geometry.dispose();
  cube.material.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
}

/**
 * 修改尺寸
 * @param edage
 * @param geometry
 * @param cube
 * @param color
 * @param width
 */
// @ts-ignore
export const modifyCubeSize = (cube,color,width,size)=>{
  const geometry = new THREE.BoxGeometry(size.depth, size.width, size.height);
  cube.geometry = geometry;
  const edgesMaterial = new THREE.LineBasicMaterial({ color });
  const edgesGeometry = new THREE.EdgesGeometry(geometry, width);
  const newEdge = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cube.add(newEdge);
  return newEdge
}
