import classNames from 'classnames';

type HostUserProps = {
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
}

function HostUser({host}: HostUserProps): JSX.Element {

  let hostUserClass = classNames('offer__avatar-wrapper', 'user__avatar-wrapper');

  if (host.isPro) {
    hostUserClass += ' offer__avatar-wrapper--pro';
  }

  return (
    <div className="offer__host-user user" data-testid="host-user">
      <div className={hostUserClass}>
        <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="offer__user-name">
        {host.name}
      </span>
      {host.isPro && (
        <span className="offer__user-status">
          Pro
        </span>
      )}
    </div>
  );
}

export default HostUser;
