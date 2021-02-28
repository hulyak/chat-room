import { useState, useCallback, useEffect, useRef } from 'react';
import { database } from '../misc/firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);
  useEffect(() => {
    // pull user data
    const userStatusRef = database.ref(`/status/${uid}`);
    userStatusRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPresence(data);
      }
    });
    return () => {
      userStatusRef.off();
    };
  }, [uid]);
  return presence;
}

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      }
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
