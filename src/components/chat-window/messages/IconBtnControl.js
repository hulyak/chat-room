import React from 'react';
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

const ConditonalBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

const IconBtnControl = ({
  isVisible,
  iconName,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {/* conditional component */}
      <ConditonalBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayHide={0}
          delayShow={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={<Icon icon={iconName} />}
          />
        </Whisper>
      </ConditonalBadge>
    </div>
  );
};

export default IconBtnControl;
