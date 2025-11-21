/**
 * Three.js 3D 배경 효과 컴포넌트
 * 귀여운 강아지 파티클이 떠다니는 효과
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

export const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // 강아지 발자국/뼈다귀 파티클 생성
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // 랜덤 위치
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // 모노톤 색상 (회색 계열)
      const grayValue = 0.4 + Math.random() * 0.3;
      colors[i * 3] = grayValue;
      colors[i * 3 + 1] = grayValue;
      colors[i * 3 + 2] = grayValue;
      
      // 크기
      sizes[i] = Math.random() * 0.5 + 0.2;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // 강아지 발자국 텍스처 (Canvas로 그리기)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // 발자국 그리기
    ctx.fillStyle = '#6c757d';
    ctx.beginPath();
    // 큰 패드
    ctx.arc(32, 40, 12, 0, Math.PI * 2);
    ctx.fill();
    // 작은 발가락들
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(20 + i * 8, 20, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      map: texture,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 애니메이션 변수
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // 마우스 이동 감지
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 윈도우 리사이즈 처리
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // 애니메이션 루프
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // 파티클 회전 애니메이션
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.08;

      // 마우스 인터랙션 (부드럽게)
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      
      particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetX - particles.rotation.y) * 0.05;

      // 파티클 위아래 움직임
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] = Math.sin(elapsedTime + positions[i3]) * 0.5;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // 클린업
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      texture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-background" />;
};

