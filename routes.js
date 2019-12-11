const routes = require('next-routes')();
routes
  .add('/elections/new', '/elections/new')
  .add('/elections/:address', '/elections/show')
  .add('/elections/:address/crypto/genKeys', 'elections/crypto/genKeys')
  .add('/elections/:address/crypto/submitResult/:account', 'elections/crypto/submitResult')
  .add('/elections/:address/crypto/submitResultProposal/:account', 'elections/crypto/submitResultProposal')
  .add('/elections/crypto/controlVote', 'elections/crypto/controlVote')
  .add('/elections/:address/crypto/controlVoteAtAddress', 'elections/crypto/controlVoteAtAddress')
  .add('/elections/:address/candidate/new', '/elections/candidate/new')
  .add('/elections/:address/candidate/show', '/elections/candidate/show')
  .add('/elections/administration/authentication', '/elections/administration/authentication')
  .add('/elections/:adminAddress/administrationElections/', '/elections/administration/showElectionAdministration')
  .add('/elections/:adminAddress/administrationFactory/', '/elections/administration/showFactoryAdministration')
  .add('/elections/candidate/:address/:id/castVote/', '/elections/candidate/castVote')
  .add('/elections/candidate/:address/castVoteProposal/', '/elections/candidate/castVoteProposal');
  

module.exports = routes;