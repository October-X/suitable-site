import * as React from 'react';
import style from './index.less'
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {container} from "@umijs/bundler-webpack/compiled/webpack";
import {useState} from 'react'


const MyComponent = () => {
    // 创建ref来保存挂载的DOM节点
    const mountRef = React.useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    // 创建Three.js场景、相机、渲染器和立方体
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000)
    let renderer = new THREE.WebGLRenderer();
    let rect = null;


    // 初始化Three.js
    const initThree = () => {
        camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
        //设置相机位置
        camera.position.set(2, 2, 10)
        scene.add(camera)
        //创建几何体
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        //设置材质
        const cubeMemarial = new THREE.LineBasicMaterial({
            color: 0xbdecaa,

        })
        //根据几何体和材质创建物体
        const cube = new THREE.Mesh(cubeGeometry, cubeMemarial)
        //将几何体添加到场景当中
        scene.add(cube)
        //初始化渲染器
        //设置渲染的尺寸大小
        renderer.setSize(rect.width, rect.height);
        //设置背景颜色
        renderer.setClearColor(0xffffff)
        //将webgl渲染的convas内容添加到body
        mountRef.current.appendChild(renderer.domElement);
        //使用渲染器，通过相机将场景渲染进来
        renderer.render(scene, camera)
        //绘制网格场景


        //网格线绘制
        var grid = new THREE.GridHelper(20, 20);
        grid.position.y = -.5;
        grid.position.x = -.5;
        grid.position.z = -.5;
        scene.add(grid);
        //设置控制器可以移动视角

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate()
    }

    const handleResize = () => {
        // console.log(`Container width: ${mountRef.current.offsetWidth}`);
        // console.log(`Container height: ${mountRef.current.offsetHeight}`);
        console.log(rect.width, rect.height)
        // camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
        rect = mountRef.current.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        renderer.render(scene, camera);
        // rect = mountRef.current.getBoundingClientRect();
    }

    // 使用useEffect钩子函数初始化和销毁Three.js
    React.useEffect(() => {
        rect = mountRef.current.getBoundingClientRect();
        // window.addEventListener('resize', handleResize);

        initThree();

        return () => {
            // window.removeEventListener('resize', handleResize);
        };
    }, []);
    React.useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                console.log('width变了')
                if (mutation.attributeName === 'style') {
                    rect = mountRef.current.getBoundingClientRect();
                    const newWidth = rect.width;
                    const newHeight = rect.height;
                    if (newWidth !== width || newHeight !== height) {
                        setWidth(newWidth);
                        setHeight(newHeight);
                        renderer.setSize(newWidth, newHeight);
                        renderer.render(scene, camera);
                    }
                }
            });

        });
        observer.observe(mountRef.current, {attributes: true});
        return () => {
            observer.disconnect();
        };
    }, [width, height])

    // 渲染Three.js场景
    renderer.render(scene, camera);

    return (<div ref={mountRef} className={style.container}/>)
};

export default MyComponent;
