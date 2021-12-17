$(function () {
  'use strict'

  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }

  var mode      = 'index'
  var intersect = true

  var $chartPendaftaran = $('#chart-pendaftaran')
  var chartPendaftaran  = new Chart($chartPendaftaran, {
    data   : {
      labels  : ['Senin', 'Selasa', 'Rabu', 'Kamis','Jumat','Sabtu','Minggu'],
      datasets: [
        {
        type                : 'line',
        data                : [5, 20, 23, 40, 50, 60, 70],
        backgroundColor     : 'transparent',
        borderColor         : '#007bff',
        pointBorderColor    : '#007bff',
        pointBackgroundColor: '#007bff',
        fill                : false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      tooltips           : {
        mode     : mode,
        intersect: intersect
      },
      hover              : {
        mode     : mode,
        intersect: intersect
      },
      legend             : {
        display: false
      },
      scales             : {
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks    : $.extend({
            beginAtZero : true,
            suggestedMax: 200
          }, ticksStyle)
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks    : ticksStyle
        }]
      }
    }
  })

  var pieChartCanvas1 = $('#pieChart1').get(0).getContext('2d')
  var pieData1        = {
    labels: [
        'TKA', 
        'TKB',
        'Play Gorup', 
        'SD',
        'SMP', 
        'SMA',  
    ],
    datasets: [
      {
        data: [200,300,100,600,500,400],
        backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef','#010336','#f39c14'],
      }
    ]
  }
  var pieOptions     = {
    legend: {
      display: true
    }
  }
  var pieChart = new Chart(pieChartCanvas1, {
    type: 'pie',
    data: pieData1,
    options: pieOptions      
  })

  var pieChartCanvas2 = $('#pieChart2').get(0).getContext('2d')
  var pieData2        = {
    labels: [
        'Laki-laki', 
        'Perempuan',  
    ],
    datasets: [
      {
        data: [1100,1000],
        backgroundColor : ['#00a65a', '#f39c12'],
      }
    ]
  }
  var pieOptions     = {
    legend: {
      display: true
    }
  }
  var pieChart = new Chart(pieChartCanvas2, {
    type: 'pie',
    data: pieData2,
    options: pieOptions      
  })
})


