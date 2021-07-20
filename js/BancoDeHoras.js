window.onload = function() {

    navegation(getWKNumState());
    mask();
    hj();
    dataHoje();   
    totalHrsDia();
    totalHrsAtivit();
    classAtivit();

    //window.location.hash = '#redline';

};

var qHrs = 0;

$(document).on('change', "#qtdHoras",
    function qtdHrs() {

        qHrs = $('#qtdHoras').val();

    }
);


//2021-07-06T13:52

$(document).on('change', "#entrada",
    function mediaHrs() {
      
        var entrada = new Date($('#entrada').val());

        if (qHrs != "") {

            var h = (qHrs.replace(':', ',')).split(',');

            var horas = h[0];
            var minutos = h[1];

            if (horas < 10) {
                var horas = horas.replace("0","");
            }

            entrada.setHours((entrada.getHours()) + parseInt(horas));
            entrada.setMinutes((entrada.getMinutes()) + parseInt(minutos));

        }
        else {
            entrada.setHours(entrada.getHours());
        }

        var dia = entrada.getDate();            // 1-31
        var mes = entrada.getMonth() +1;        // 0-11 (zero=janeiro)
        var ano4 = entrada.getFullYear();       // 4 dígitos

        var hora = entrada.getHours();          // 0-23
        var min = entrada.getMinutes();         // 0-59

        if (hora < 10) {
            hora = "0" + hora;
        }

        if (min < 10) {
            min = "0" + min;
        }

        if (dia < 10) {
            dia = "0" + dia; 
        }

        if (mes < 10) {
            mes = "0" + mes;
        }

        var saida = ano4+'-'+mes+'-'+dia+'T'+hora+":"+min;

        $('#saida').val(saida);

       
    }
);


/* ------------- Timeline ------------- */

function classe(numState) {

    $('#atividade9').removeClass('timeline-invisible');
    $('#atividade9').addClass('timeline-hrs');

    $('#atividade2').removeClass('timeline-invisible');
    $('#atividade2').addClass('timeline-hrs');

    $('#atividade3').removeClass('timeline-invisible');
    $('#atividade3').addClass('timeline-hrs');

    if (numState == 0) {

    $('#atividade9').val('4.00');

    $('#atividade2').val('8.00');

    $('#atividade3').val('9.00');
    
    }

};

function navegation(numState) {

    if (numState == 2) {

        classe();
    }
};

//MÁSCARA
function mask() {

    var mask = "Hh:Mm",
    pattern = {
        'translation': {
            'H': {
                pattern: /[0-9]/
            },
            'h': {
                pattern: /[0-9]/
            },
            'M': {
                pattern: /[0-5]/
            },
            'm': {
                pattern: /[0-9]/
            }
        }
    };

$("#qtdHoras").mask(mask, pattern);

};

//Atividades e Manipulação de Horas
function timelineHrs() {

    var entrada = new Date($('#entrada').val());
    var saida = new Date($('#saida').val());

    var eHrs_min = ((entrada.getHours() * 60) + (entrada.getMinutes()));
    var sHrs_min = ((saida.getHours() * 60) + (saida.getMinutes()));

    var eDay = entrada.getDate();
    var sDay = saida.getDate()

    var differenceDay = sDay - eDay;

    if (differenceDay == 0) {

        var differenceHrs = (sHrs_min - eHrs_min) / 60;
        var arrayHM = ((differenceHrs.toString()).replace('.', ':')).split(':');

        var horas = arrayHM[0];

        var min = parseInt(parseFloat('0'+'.'+arrayHM[1]) * 60);

        if (min < 10) {

            min = "0"+min;
        }

        var timeline = horas+'h'+min;
    }
    else {
        
        var hrsMin = ((((sDay - eDay)*24)*60)-eHrs_min)+sHrs_min;

        var arrayHrs = ((hrsMin / 60).toString()).split('.');

        var horas = arrayHrs[0];

        var min = parseInt(parseFloat('0'+'.'+arrayHrs[1]) * 60);

        if (min < 10) {

            min = "0"+min;
        }

        var timeline = horas+'h'+min;
      
    }
   
    var day = entrada.getDate();

     //Horas
     var horas_notE = entrada.getHours();
     var minutes_notE = entrada.getMinutes();
 
     var horas_notS = saida.getHours();
     var minutes_notS = saida.getMinutes();
 
     if(minutes_notE < 10) {
         minutes_notE = '0'+minutes_notE;
     }
     if (minutes_notS < 10) {
         minutes_notS = '0'+minutes_notS;
     }

    var activity = $('#atvProg').val();

    if (activity == 1) {
    
        $('#cro_day'+day).removeClass();
        $('#cro_day'+day).addClass('timeline-cro');
        $('#cro_day'+day).val(timeline);

        $('#e_cro_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_cro_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_cro_day'+day).removeClass();
        $('#a_cro_day'+day).addClass('note');

    }
    else if (activity == 2) {

        $('#se_day'+day).removeClass();
        $('#se_day'+day).addClass('timeline-se');
        $('#se_day'+day).val(timeline);

        $('#e_se_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_se_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_se_day'+day).removeClass();
        $('#a_se_day'+day).addClass('note');

    }
    else if (activity == 3) {

        $('#learn_day'+day).removeClass();
        $('#learn_day'+day).addClass('timeline-learn');
        $('#learn_day'+day).val(timeline);

        $('#e_learn_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_learn_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);
        
        $('#a_learn_day'+day).removeClass();
        $('#a_learn_day'+day).addClass('note');

    }
    else if (activity == 4) {

        $('#meet_day'+day).removeClass();
        $('#meet_day'+day).addClass('timeline-meet');
        $('#meet_day'+day).val(timeline);

        $('#e_meet_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_meet_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_meet_day'+day).removeClass();
        $('#a_meet_day'+day).addClass('note');
    }
    else if (activity == 5) {

        $('#project_day'+day).removeClass();
        $('#project_day'+day).addClass('timeline-project');
        $('#project_day'+day).val(timeline);

        $('#e_project_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_project_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_project_day'+day).removeClass();
        $('#a_project_day'+day).addClass('note');
    }
    else if (activity == 6) {

        $('#rev_day'+day).removeClass();
        $('#rev_day'+day).addClass('timeline-rev');
        $('#rev_day'+day).val(timeline);

        $('#e_rev_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_rev_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_rev_day'+day).removeClass();
        $('#a_rev_day'+day).addClass('note');
    }
    else if (activity == 7) {

        $('#hrsA_day'+day).removeClass();
        $('#hrsA_day'+day).addClass('timeline-hrsA');
        $('#hrsA_day'+day).val(timeline);

        $('#e_hrsA_day'+day).val('Entrada: '+horas_notE+':'+minutes_notE);
        $('#s_hrsA_day'+day).val('Saída: '+horas_notS+':'+minutes_notS);

        $('#a_hrsA_day'+day).removeClass();
        $('#a_hrsA_day'+day).addClass('note');
    }


    $('#atvProg').val("");
    $('#qtdHoras').val("");
    $('#entrada').val("");
    $('#saida').val("");
};

function hj() {

    var date = new Date();

    var dia = date.getDate();
    
    $('#redline').removeClass();
    $('#redline').addClass('line-day'+dia).position().left;

    setTimeout(function(){

        if (dia > 26) {
            document.getElementById('div_timeline').scrollLeft = 2112;
        }
        else if (dia > 18) {
            document.getElementById('div_timeline').scrollLeft = 1626.67;
        }
        else if (dia > 9) {
            document.getElementById('div_timeline').scrollLeft = 869.34;
        }

    }, 1000);
};

function dataHoje() {

    // Obtém a data/hora atual
	var data = new Date();
	
    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var mes = data.getMonth() + 1;          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();      // 4 dígitos
    
    // Formata a data e a hora (note o mês + 1)

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes == 1) {
        mes = 'Janeiro';
    }
    else if (mes == 2) {
        mes = 'Fevereiro';
    }
    else if (mes == 3) {
        mes = 'Março';
    }
    else if (mes == 4) {
        mes = 'Abril';
    }
    else if (mes == 5) {
        mes = 'Maio';
    }
    else if (mes == 6) {
        mes = 'Junho';
    }
    else if (mes == 7) {
        mes = 'Julho';
    }
    else if (mes == 8) {
        mes = 'Agosto';
    }
    else if (mes == 9) {
        mes = 'Setembro';
    }
    else if (mes == 10) {
        mes = 'Outubro';
    }
    else if (mes == 11) {
        mes = 'Novembro'
    }
    else if (mes == 12) {
        mes = 'Dezembro'
    }

    var title = document.getElementById('div_hoje');
    
    title.innerHTML = '<h1>'+dia+" "+mes+", "+ano4+'</h1>';
}

function totalHrsAtivit() {

    var cronograma = 0;
    var servico = 0;
    var learning = 0;
    var meet = 0;
    var project = 0;
    var rev = 0;
    var hrsa = 0;

    //Cronograma
    for (var i = 1; i <= 31; i++) {

        var hrs = 0;

        valid = $('#cro_day'+i).val();

        if (valid != "") {

        hrs = $('#cro_day'+i).val().replace('h', ':').split(':');

        h = hrs[0];
        m = hrs[1];

        cronograma = cronograma + (parseInt(h)*60) + parseInt(m);

        }
    }

    //Serviços Externos
    for (var i = 1; i <= 31; i++) {

        var hrs2 = 0;

        valid2 = $('#se_day'+i).val();

        if (valid2 != "") {

        hrs2 = $('#se_day'+i).val().replace('h', ':').split(':');

        h2 = hrs2[0];
        m2 = hrs2[1];

        servico = servico + (parseInt(h2)*60) + parseInt(m2);

        }
    }

    //Treinamento
    for (var i = 1; i <= 31; i++) {

        var hrs3 = 0;

        valid3 = $('#learn_day'+i).val();

        if (valid3 != "") {

        hrs3 = $('#learn_day'+i).val().replace('h', ':').split(':');

        h3 = hrs3[0];
        m3 = hrs3[1];

        learning = learning + (parseInt(h3)*60) + parseInt(m3);

        }
    }

    //Reunião
    for (var i = 1; i <= 31; i++) {

        var hrs4 = 0;

        valid4 = $('#meet_day'+i).val();

        if (valid4 != "") {

        hrs4 = $('#meet_day'+i).val().replace('h', ':').split(':');

        h4 = hrs4[0];
        m4 = hrs4[1];

        meet = meet + (parseInt(h4)*60) + parseInt(m4);

        }
    }

    //Gestão de Projeto
    for (var i = 1; i <= 31; i++) {

        var hrs5 = 0;

        valid5 = $('#project_day'+i).val();

        if (valid5 != "") {

        hrs5 = $('#project_day'+i).val().replace('h', ':').split(':');

        h5 = hrs5[0];
        m5 = hrs5[1];

        project = project + (parseInt(h5)*60) + parseInt(m5);

        }
    }

    //Revisão
    for (var i = 1; i <= 31; i++) {

        var hrs6 = 0;

        valid6 = $('#rev_day'+i).val();

        if (valid6 != "") {

        hrs6 = $('#rev_day'+i).val().replace('h', ':').split(':');

        h6 = hrs6[0];
        m6 = hrs6[1];

        rev = rev + (parseInt(h6)*60) + parseInt(m6);

        }
    }

    //Horas de Almoço
    for (var i = 1; i <= 31; i++) {

        var hrs7 = 0;

        valid7 = $('#hrsA_day'+i).val();

        if (valid7 != "") {

        hrs7 = $('#hrsA_day'+i).val().replace('h', ':').split(':');

        h7 = hrs7[0];
        m7 = hrs7[1];

        hrsa = hrsa + (parseInt(h7)*60) + parseInt(m7);

        }
    }

    var h_cronograma = ((cronograma / 60).toString()).split('.');
    var h_servico = ((servico / 60).toString()).split('.');
    var h_learning = ((learning / 60).toString()).split('.');
    var h_meet = ((meet / 60).toString()).split('.');
    var h_project = ((project / 60).toString()).split('.');
    var h_rev = ((rev / 60).toString()).split('.');
    var h_hrsa = ((hrsa / 60).toString()).split('.');
    
    var ch = h_cronograma[0]
    var cm =  parseInt((parseFloat('0.'+h_cronograma[1]))*60);

    var sh = h_servico[0]
    var sm = parseInt((parseFloat('0.'+h_servico[1]))*60);

    var lh = h_learning[0]
    var lm = parseInt((parseFloat('0.'+h_learning[1]))*60);

    var mh = h_meet[0]
    var mm = parseInt((parseFloat('0.'+h_meet[1]))*60);

    var ph = h_project[0]
    var pm = parseInt((parseFloat('0.'+h_project[1]))*60);

    var rh = h_rev[0]
    var rm = parseInt((parseFloat('0.'+rm))*60);

    var hh = h_hrsa[0]
    var hm = parseInt((parseFloat('0.'+h_hrsa[1]))*60);
    
    if (cm < 10) {
        cm = '0'+cm
    }
    if (sm < 10) {
        sm = '0'+sm
    }
    if (lm < 10) {
        lm = '0'+lm
    }
    if (mm < 10) {
        mm = '0'+mm
    }
    if (pm < 10) {
        pm = '0'+pm
    }
    if (rm < 10) {
        rm = '0'+rm
    }
    if (hm < 10) {
        hm = '0'+hm
    }

    t_cronograma = ch +'h'+ cm;
    t_servico = sh +'h'+ sm;
    t_learning = lh +'h'+ lm;
    t_meet = mh +'h'+ mm;
    t_project = ph +'h'+ pm;
    t_rev = rh +'h'+ rm;
    t_hrsa = hh +'h'+ hm;

    
    $('#tHrs_cro').val(t_cronograma);
    $('#tHrs_se').val(t_servico);
    $('#tHrs_learn').val(t_learning);
    $('#tHrs_meet').val(t_meet);
    $('#tHrs_project').val(t_project);
    $('#tHrs_rev').val(t_rev);
    $('#tHrs_hrsA').val(t_hrsa);
    
    $('#tHrs_cro').removeClass();
    $('#tHrs_se').removeClass();
    $('#tHrs_learn').removeClass();
    $('#tHrs_meet').removeClass();
    $('#tHrs_project').removeClass();
    $('#tHrs_rev').removeClass();
    $('#tHrs_hrsA').removeClass();
    $('#tHrs_hrsD').removeClass();

    $('#tHrs_cro').addClass('timeline-total');
    $('#tHrs_se').addClass('timeline-total');
    $('#tHrs_learn').addClass('timeline-total');
    $('#tHrs_meet').addClass('timeline-total');
    $('#tHrs_project').addClass('timeline-total');
    $('#tHrs_rev').addClass('timeline-total');
    $('#tHrs_hrsA').addClass('timeline-total');
    $('#tHrs_hrsD').addClass('timeline-totalH');

    var totalHrs = cronograma + servico + learning + meet + project + rev;

    var h_totalHrs = ((totalHrs / 60).toString()).split('.');

    var ht = h_totalHrs[0]
    var mt =  parseInt((parseFloat('0.'+h_totalHrs[1]))*60);

    if (mt < 10) {
        mt = '0'+mt
    }

    $('#tHrs_hrsD').val(ht+'h'+mt);

}

function classAtivit() {

    for (var i = 1; i <= 31; i++) {

        var cron = $('#cro_day'+i).val();
        var serv = $('#se_day'+i).val();
        var train = $('#learn_day'+i).val();
        var reun = $('#meet_day'+i).val();
        var proj = $('#project_day'+i).val();
        var rev = $('#rev_day'+i).val();
        var horaA = $('#hrsA_day'+i).val();

        if (cron != "") {
            $('#cro_day'+i).removeClass();
            $('#cro_day'+i).addClass('timeline-cro');
            
            $('#a_cro_day'+i).removeClass();
            $('#a_cro_day'+i).addClass('note');
        }
        if (serv != "") {
            $('#se_day'+i).removeClass();
            $('#se_day'+i).addClass('timeline-se');
            
            $('#a_se_day'+i).removeClass();
            $('#a_se_day'+i).addClass('note');
        }
        if (train != "") {
            $('#learn_day'+i).removeClass();
            $('#learn_day'+i).addClass('timeline-learn');
            
            $('#a_learn_day'+i).removeClass();
            $('#a_learn_day'+i).addClass('note');
        }
        if (reun != "") {
            $('#meet_day'+i).removeClass();
            $('#meet_day'+i).addClass('timeline-meet');
            
            $('#a_meet_day'+i).removeClass();
            $('#a_meet_day'+i).addClass('note');
        }
        if (proj != "") {
            $('#project_day'+i).removeClass();
            $('#project_day'+i).addClass('timeline-project');
            
            $('#a_project_day'+i).removeClass();
            $('#a_project_day'+i).addClass('note');
        }
        if (rev != "") {
            $('#rev_day'+i).removeClass();
            $('#rev_day'+i).addClass('timeline-rev');
            
            $('#a_rev_day'+i).removeClass();
            $('#a_rev_day'+i).addClass('note');
        }
        if (horaA != "") {
            $('#hrsA_day'+i).removeClass();
            $('#hrsA_day'+i).addClass('timeline-hrsA');
            
            $('#a_hrsA_day'+i).removeClass();
            $('#a_hrsA_day'+i).addClass('note');
        }
    }
}

function totalHrsDia() {

    for (var i = 1; i <= 31; i++) {

        var cronograma = 0;
        var servico = 0;
        var learning = 0;
        var meet = 0;
        var project = 0;
        var rev = 0;
        var hrsa = 0;

        //Cronograma
        var hrs = 0;

        valid = $('#cro_day'+i).val();

        if (valid != "") {

            hrs = $('#cro_day'+i).val().replace('h', ':').split(':');

            h = hrs[0];
            m = hrs[1];

            cronograma = cronograma + (parseInt(h)*60) + parseInt(m);
        }

        //Serviços Externos
        var hrs2 = 0;

        valid2 = $('#se_day'+i).val();

        if (valid2 != "") {

            hrs2 = $('#se_day'+i).val().replace('h', ':').split(':');

            h2 = hrs2[0];
            m2 = hrs2[1];

            servico = servico + (parseInt(h2)*60) + parseInt(m2);
        }

        //Treinamento
        var hrs3 = 0;

        valid3 = $('#learn_day'+i).val();

        if (valid3 != "") {

            hrs3 = $('#learn_day'+i).val().replace('h', ':').split(':');

            h3 = hrs3[0];
            m3 = hrs3[1];

            learning = learning + (parseInt(h3)*60) + parseInt(m3);
        }

        //Reunião
        var hrs4 = 0;

        valid4 = $('#meet_day'+i).val();

        if (valid4 != "") {

            hrs4 = $('#meet_day'+i).val().replace('h', ':').split(':');

            h4 = hrs4[0];
            m4 = hrs4[1];

            meet = meet + (parseInt(h4)*60) + parseInt(m4);
        }

        //Gestão de Projeto
        var hrs5 = 0;

        valid5 = $('#project_day'+i).val();

        if (valid5 != "") {

            hrs5 = $('#project_day'+i).val().replace('h', ':').split(':');

            h5 = hrs5[0];
            m5 = hrs5[1];

            project = project + (parseInt(h5)*60) + parseInt(m5);
        }

        //Revisão
        var hrs6 = 0;

        valid6 = $('#rev_day'+i).val();

        if (valid6 != "") {

            hrs6 = $('#rev_day'+i).val().replace('h', ':').split(':');

            h6 = hrs6[0];
            m6 = hrs6[1];

            rev = rev + (parseInt(h6)*60) + parseInt(m6);
        }

        //Horas de Almoço
        var hrs7 = 0;

        valid7 = $('#hrsA_day'+i).val();

        if (valid7 != "") {

            hrs7 = $('#hrsA_day'+i).val().replace('h', ':').split(':');

            h7 = hrs7[0];
            m7 = hrs7[1];

            hrsa = hrsa + (parseInt(h7)*60) + parseInt(m7);
        }

        var day = cronograma + servico + learning + meet + project + rev;


        var h_day = ((day / 60).toString()).split('.');

        
        var hd = h_day[0]
        var md =  parseInt((parseFloat('0.'+h_day[1]))*60);

        
        if (md < 10) {
            md = '0'+md
        }
        
        $('#hrsD_day'+i).val(hd + "h" + md);
        
        $('#hrsD_day'+i).removeClass();
       
        $('#hrsD_day'+i).addClass('timeline-totalH');
    
    }

}
