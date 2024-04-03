import * as THREE from "three";
import { useControls } from 'leva';
import Experience from '../Experience/Experience';


const PortalHelper: React.FC = () => {
  const experience = Experience.Instance()
  const {uDisplacement, uMulDisplacement, uStrength, uMulStrength, uOuterGlow, uMulOuterGlow, uFlat, uColorStart, uColorEnd } = experience!.materials.items.portalLightMaterial.uniforms

  useControls('portal', {

    uDisplacement:    { value: 0.1, min: 0, max: 2,  step: 0.1, onChange: (value) => uDisplacement.value    = value},
    uMulDisplacement: { value: 5.0, min: 0, max: 50, step: 0.1, onChange: (value) => uMulDisplacement.value = value},
    uStrength:        { value: 0.7, min: 0, max: 10, step: 0.1, onChange: (value) => uStrength.value        = value},
    uMulStrength:     { value: 5.0, min: 0, max: 50, step: 0.1, onChange: (value) => uMulStrength.value     = value},
    uOuterGlow:       { value: 1.4, min: 0, max: 2,  step: 0.1, onChange: (value) => uOuterGlow.value       = value},
    uMulOuterGlow:    { value: 5.0, min: 0, max: 10, step: 0.1, onChange: (value) => uMulOuterGlow.value    = value},
    uFlat:            { value: 0.8, min: 0, max: 5,  step: 0.1, onChange: (value) => uFlat.value            = value},
    uColorStart:      { value: "#ffffff", onChange: (value) => uColorStart.value = new THREE.Color(value)},
    uColorEnd:        { value: "#910cac", onChange: (value) => uColorEnd.value   = new THREE.Color(value)}

  })
return <></>
}

export default PortalHelper