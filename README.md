# ONECARDGAME
자바스크립트로 구현한 원카드 게임(싱글 플레이)입니다.

# 게임 규칙

게임 인원은 4명(플레이어 포함) 입니다.
게임 진행은 시계방향입니다.
시작 기준은 랜덤하게 정해집니다.
시작 카드는 5장 입니다.
보이게 뒤집어 놓은 카드 뭉치의 맨 위에 있는 카드와 동일한 숫자 또는 무늬의 카드를 뭉치 위에 계속해서 한 장씩 올려놓으면서, 자신의 모든 카드를 소모하면 승리합니다.
자신을 제외한 모두가 파산(소유 카드가 12장을 초과하는 사람)이 되면 승리합니다.

예를 들어, 정통 룰 기준 ♥5가 제시되어 있다면 같은 하트 무늬의 카드 중 하나(♥2, ♥3, ♥4, ♥6, ♥7, ♥8, ♥9, ♥10, ♥J, ♥Q, ♥K, ♥A)나 ♠5, ♣5, ♦5 중 한 장만 낼 수 있다.

만약 자기가 가진 카드 중에서 올려놓을 수 있는 카드가 없다면 대신 카드 한 장을 가져가고 다음 사람에게 순서를 넘겨야 한다.

카드 뭉치의 카드가 전부 사라지면, 이미 쌓인 카드를 맨 위의 카드만 남겨놓고 다시 섞어서 엎어놓아 카드 뭉치를 만든다.(딜러)

그리고 자기가 가진 마지막 카드를 낼 때, '원 카드'를 선언해야 승리할 수 있다. 물론 선언 자체를 생략하기도 한다.
