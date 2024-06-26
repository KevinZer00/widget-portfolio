let equalizerColor = 'rgb(0, 255, 0)';

const themes = {
    light: {
        bodyClass: 'light-mode',
        equalizerColor: 'rgb(0, 123, 255)',
        networkChartColor: 'rgb(0, 123, 255)',
        volumeSliderColor: 'rgb(0, 123, 255)' 
    },
    dark: {
        bodyClass: '',
        equalizerColor: 'rgb(0, 255, 0)',
        networkChartColor: 'rgb(0, 255, 0)',
        volumeSliderColor: 'rgb(0, 255, 0)' 
    },
    pastel: {
        bodyClass: 'pastel-mode',
        equalizerColor: 'rgb(185, 157, 255)',
        networkChartColor: 'rgb(185, 157, 255)',
        volumeSliderColor: 'rgb(185, 157, 255)' 
    },
    synthwave: {
        bodyClass: 'synthwave-mode',
        equalizerColor: 'rgb(251, 142, 6)',
        networkChartColor: 'rgb(251, 142, 6)',
        volumeSliderColor: 'rgb(251, 142, 6)' 
    },
    halo: {
        bodyClass: 'halo-mode',
        equalizerColor: 'rgb(251, 142, 6)',
        networkChartColor: 'rgb(251, 142, 6)',
        volumeSliderColor: 'rgb(251, 142, 6)' 
    }
};


let currentTheme = 'dark'; 

function changeTheme(theme) {
    currentTheme = theme;
    // Clear all theme classes first
    document.body.classList.remove('light-mode', 'pastel-mode', 'synthwave-mode', 'halo-mode'); 

    // Set the new theme class
    const themeClass = themes[theme].bodyClass;
    if (themeClass) {
        document.body.classList.add(themeClass);
    }

    // Update the equalizer color
    equalizerColor = themes[theme].equalizerColor;
    drawEqualizer(); // Redraw the equalizer with the new color

     // Update the volume slider color
     updateVolumeSliderColor();

    // Update the chart color
    updateChartColor(networkChart, themes[theme].networkChartColor);

    // Update the current theme
    currentTheme = theme;
}

