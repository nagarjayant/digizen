(function() {
   EF.globals.marketCode = 'cs';
   EF.globals.campaignName = "GH_GoldenBrochure";
   EF.globals.campaignAllocationPrograms = ['ILS','LT','LY'];
   EF.globals.tnc='tc/Teilnahmebedingungen.pdf';
   EF.globals.customQA = [{
                  type: 'dropdown', 
                  name: 'CustomDropdown',
                  label: 'Mich interessiert folgende Auslandsoption:',
                  values: [{
                    name: 'SomeName',
                    values: [{
                      text: '--- Gewünschte Kurslänge ---',
                      value: '',
                    },
                    {
                      text: 'ab 2 Wochen bis zu 5 Monaten ',
                      value: 'ILSH, ILS',
                    },
                    {
                      text: '5 Monate oder mehr',
                      value: 'APP',
                    }]
                  }],
                  goToQA: true,
                  goToComments: true,
                
          }];
   
      // Additional mandatorysetup required for tracking
      EF.setupTracking({
             root: 'hub', // this will change the first fragment.. as described in the previous point
             loadGTM: true, // this will load the GTM lib for you
             loadMinerva: true, // this is needed
             debug: false,
             autoInitialize: true, // this will add listeners for custom links in the page
      });
   
   //share
    var container = document.getElementById('share-wrapper');
        EF.renderShareButtons({
          target: container, // mandatory
          url: 'http://liuxue.ef.com.cn', // mandatory
          title: 'Sample title',
          description: 'Some description here',
          picture: 'http://ichef-1.bbci.co.uk/news/976/media/images/83351000/jpg/_83351965_explorer273lincolnshirewoldssouthpicturebynicholassilkstone.jpg',
          media: ['facbeook', {name: 'wrong'}, 'facebook', 'whatsapp', 'twitter', 'email', 'wechat'] // mandatory
        });
   
   //thankyou
     window.PubSub.subscribe('ef-fr.plugin-registration', function (name, settings) {
            window.PubSub.subscribe('ef-fr.submission-completed.' + settings.id, function () {
             
              document.querySelector('#fullpage').style.display = 'none';
              document.querySelector('#form').style.display = 'none';
              document.querySelector('#thank-you').style.display = 'block';
            });
        });

       new EF.Form({
          id: 'simple-form',
          container: '#form-wrapper',
          campaignAllocationPrograms: EF.globals.campaignAllocationPrograms,
          productCode: 'LS',
          programCode: 'ILS,APP,ILSH',
          validateOnChange: true, // True by default, but it can be turned off if needed
          finalize: true, // Finalize form: sends "isCompleted": true to poseidon
          //skipCORS: true,
          
          
          customFields: EF.globals.customQA,
         ordering: [

                {
                  field: 'CustomDropdown',
                  after: 'BirthDate',
                }
          ],
         reshape: {
                     WantsBrochure: {
                        default: false, // Precheck the wantsbrochure and show also the address fields
                        label:'Ja, ich interessiere mich für einen Sprachaufenthalt.',
                   },
                     MobilePhone: {
                        label: 'Telefonnummer',
                   },
                     YesEmailMarketing :{
                          default:true,
                          show: false,
                    },
                     HasAcceptedTerms: {
                        label: '<a href="'+ EF.globals.tnc  +'" target="_blank">$value</a>',
                   }
            
         }
        })
         .createCampaignForm();
       }());
