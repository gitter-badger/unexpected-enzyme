import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ id }) => (
  <span className="user" id={`user-${id}`}>
    User {id}
  </span>
);

User.propTypes = {
  id: PropTypes.number
};

const Fixture = () => (
  <div>
    <ul>
      <li>
        <User id={1} name="John" />
      </li>
      <li>
        <User id={2} name="Doe" />
        <User id={3} name="Mark" />
      </li>
    </ul>
  </div>
);

describe('to-contain', () => {
  describe('<ReactElement>', () => {
    it('passes when the actual matches the expected', () => {
      expect(mount(<Fixture />), 'to contain', <User id={1} />);
      expect(mount(<Fixture />), 'to contain', <User id={2} />);
    });

    it('fails when the actual does not match the expected', () => {
      expect(
        () => expect(mount(<Fixture />), 'to contain', <User id={4} />),
        'with error matching snapshot'
      );
    });

    describe('when negated', () => {
      it('passes negated when the actual does not match the expected', () => {
        expect(mount(<Fixture />), 'not to contain', <User id={4} />);
      });

      it('fails when the actual does match the expected', () => {
        expect(
          () => expect(mount(<Fixture />), 'not to contain', <User id={2} />),
          'with error matching snapshot'
        );
      });
    });
  });

  describe('<selector>', () => {
    it('passes when the actual matches the expected', () => {
      expect(mount(<Fixture />), 'to contain', '#user-1');
      expect(mount(<Fixture />), 'to contain', '#user-2');
    });

    it('fails when the actual does not match the expected', () => {
      expect(
        () => expect(mount(<Fixture />), 'to contain', '#user-4'),
        'with error matching snapshot'
      );
    });
  });
});
