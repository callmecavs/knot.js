import chai from 'chai'
import knot from '../src/knot'

const assert = chai.assert

describe('knot', function() {
  // For Class based test
  class Subject {
    constructor(passedInName) {
      this.passedInName = passedInName
      this.name = 'knot.js'
      this.birthplace = 'Github'
      this.nameToTell = ''
      this.birthplaceToTell = ''
    }

    tellName() {
      this.nameToTell = this.name
    }

    tellBirthplace() {
      this.birthplaceToTell = this.birthplace
    }
  }

  const KnottedSubject = knot(Subject)

  // For Object based test
  const defaultSubject = {
    name: 'knot.js',
    birthplace: 'Github',
    nameToTell: '',
    birthplaceToTell: '',
    tellName: function() {
      this.nameToTell = this.name
    },
    tellBirthplace: function() {
      this.birthplaceToTell = this.birthplace
    }
  }

  let subject

  const tests = [{
    name: 'Class based',
    getSubject() {
      return new KnottedSubject('passed in')
    }
  }, {
    name: 'Object based',
    getSubject() {
      return knot(Object.assign({}, defaultSubject))
    }
  }]

  // Dynamically generate tests
  tests.forEach(function(test) {
    context(`knot(target) ${test.name}`, function() {
      beforeEach(function() {
        subject = test.getSubject()
      })

      describe('#knot(target) chainability', function() {
        it('All methods should return the calling object', function() {
          const chained = subject.on('a', () => {})
            .once('b', () => {})
            .off('a')
            .emit('b')
          assert.equal(chained, subject, 'All methods should return the calling object')
        })
      })

      describe('#knot(target).on & emit', function() {
        beforeEach(function() {
          subject.on('tell-name', subject.tellName)
        })

        it('should not execute handler on registered', function() {
          assert.notEqual(subject.nameToTell, subject.name)
        })

        it('should responds to event after registered', function() {
          subject.emit('tell-name')
          assert.equal(subject.nameToTell, subject.name)
        })

        it('should responds to event after registered more than once', function() {
          subject.emit('tell-name')
          assert.equal(subject.nameToTell, subject.name)
          subject.nameToTell = ''
          subject.emit('tell-name')
          assert.equal(subject.nameToTell, subject.name)
        })
      })

      describe('#knot(target).once', function() {
        beforeEach(function() {
          subject.once('tell-name', subject.tellName)
        })

        it('should not execute handler on registered', function() {
          assert.notEqual(subject.nameToTell, subject.name)
        })

        it('should responds to event after registered once and only once', function() {
          subject.emit('tell-name')
          assert.equal(subject.nameToTell, subject.name)
          subject.nameToTell = ''
          subject.emit('tell-name')
          assert.notEqual(subject.nameToTell, subject.name)
        })
      })

      describe('#knot(target).off', function() {
        it('should not respond to deregistered event', function() {
          subject.on('tell-name', subject.tellName)
            .once('tell-birthplace', subject.tellBirthplace)
            .off('tell-name')
            .off('tell-birthplace')
            .emit('tell-name')
            .emit('tell-birthplace')
          assert.notEqual(subject.nameToTell, subject.name)
          assert.notEqual(subject.birthplaceToTell, subject.birthplace)
        })
      })

      describe('#knot(target).events is own property', function() {
        it('should not respond to deregistered event', function() {
          assert.isOk(subject.hasOwnProperty('events'))
        })
      })

      if (test.name === 'Class based') {
        describe('#knot(Class) returns new constructor', function() {
          it('should preserve constructor arguments', function() {
            assert.equal(subject.passedInName, 'passed in')
          })
        })
      }
    })
  })
})
