import React from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const Toggletemp=(props) => {
        return (
                <BootstrapSwitchButton
                        checked={false}
                        onlabel='F'
                        offlabel='C'
                        onChange={props.setUnits}
                        onstyle="warning"
                        size='lg'
                        />
        )
}

export default Toggletemp

